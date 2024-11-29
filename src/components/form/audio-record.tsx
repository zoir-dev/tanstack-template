import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Mic, MicOff, PauseCircle, PlayCircle, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import RecordPlugin from "wavesurfer.js/dist/plugins/record.esm.js";
import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormReturn,
} from "react-hook-form";
import { Label } from "../ui/label";
import ErrorMessage from "../ui/error-message";

interface AudioRecorderProps<IForm extends FieldValues> {
  methods: UseFormReturn<IForm>;
  name: Path<IForm>;
  name2: Path<IForm>;
  label?: string;
  required?: boolean;
  registerOptions?: RegisterOptions<IForm>;
  hideError?: boolean;
}

export default function FormAudioRecord<IForm extends FieldValues>({
  methods,
  name,
  name2,
  label,
  hideError = false,
}: AudioRecorderProps<IForm>) {
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const waveSurferRef = useRef<WaveSurfer | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioEnded, setIsAudioEnded] = useState(false);
  const {
    register,
    formState: { errors },
  } = methods;

  const reg = register(name);

  const getPrimaryHSL = () =>
    getComputedStyle(document.documentElement).getPropertyValue("--primary");
  const getMuted = () =>
    getComputedStyle(document.documentElement).getPropertyValue("--muted");

  useEffect(() => {
    waveSurferRef.current = WaveSurfer.create({
      container: waveformRef.current as HTMLDivElement,
      waveColor: `hsl(${getMuted()})`,
      progressColor: `hsl(${getPrimaryHSL()})`,
      cursorWidth: 0,
      barWidth: 2,
      barHeight: 5.5,
      barRadius: 1,
      height: 28,
      hideScrollbar: true,
      backend: "WebAudio",
    });

    const recordPlugin = RecordPlugin.create({ continuousWaveform: true });
    waveSurferRef.current.registerPlugin(recordPlugin);

    recordPlugin.on("record-end", (blob: Blob) => {
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      methods.setValue(name2, blob as any);
    });

    return () => {
      waveSurferRef.current?.destroy();
    };
  }, []);

  useEffect(() => {
    waveSurferRef.current?.on("finish", () => setIsAudioEnded(true));
    waveSurferRef.current?.on("play", () => {
      setIsPlaying(true);
      setIsAudioEnded(false);
    });
    waveSurferRef.current?.on("pause", () => setIsPlaying(false));
  }, [isPlaying]);

  const startRecording = async () => {
    if (waveSurferRef.current) {
      methods.setValue(name, "" as any);
      setIsRecording(true);
      await (
        waveSurferRef.current.getActivePlugins()?.[0] as RecordPlugin
      )?.startMic();
      await (
        waveSurferRef.current.getActivePlugins()?.[0] as RecordPlugin
      )?.startRecording();
      methods.resetField(name);
    }
  };

  const stopRecording = async () => {
    if (waveSurferRef.current) {
      (
        waveSurferRef.current.getActivePlugins()?.[0] as RecordPlugin
      )?.stopRecording();
      (
        waveSurferRef.current.getActivePlugins()?.[0] as RecordPlugin
      )?.stopMic();
      setIsRecording(false);
      setIsAudioEnded(true);
    }
  };

  const handlePlayPause = () => {
    if (waveSurferRef.current) {
      if (isAudioEnded) {
        waveSurferRef.current.seekTo(0);
        setIsAudioEnded(false);
      }
      waveSurferRef.current.playPause();
    }
  };

  const handleClear = () => {
    waveSurferRef.current?.stop();
    setAudioUrl(null);
  };

  return (
    <fieldset className="relative w-full rounded-md flex flex-col gap-2">
      {label && (
        <Label
          htmlFor={name}
          className={cn(
            !!errors?.[name] && "text-destructive",
            "cursor-pointer"
          )}
        >
          {label}
        </Label>
      )}
      <div className="relative w-full rounded-md">
        <Input
          {...reg}
          placeholder="Izoh"
          fullWidth
          suffix={
            audioUrl ? (
              <span
                onClick={handleClear}
                className={cn(
                  "text-primary",
                  methods.formState.disabled &&
                    "opacity-50 pointer-events-none cursor-not-allowed"
                )}
              >
                <X width={16} />
              </span>
            ) : (
              <span
                onClick={isRecording ? stopRecording : startRecording}
                className="text-primary"
              >
                {isRecording ? <MicOff width={20} /> : <Mic width={20} />}
              </span>
            )
          }
          prefixIcon={
            audioUrl && (
              <span
                onClick={handlePlayPause}
                className="text-primary-foreground"
              >
                {isPlaying ? (
                  <PauseCircle className="fill-primary" width={25} />
                ) : (
                  <PlayCircle className="fill-primary" width={25} />
                )}
              </span>
            )
          }
          id={name}
        />
        <div
          className={cn(
            "top-1 h-8 left-9 flex items-center w-[calc(100%-64px)] right-9 bg-background absolute",
            isRecording || audioUrl ? "z-10" : "-z-10",
            isRecording && "left-1 w-[calc(100%-36px)]"
          )}
        >
          <div
            ref={waveformRef}
            className={`w-full ${methods.formState.disabled ? "pointer-events-none" : ""}`}
            onClick={handlePlayPause}
          ></div>
        </div>
      </div>
      {!hideError && errors && (
        <ErrorMessage className="-mt-1">
          {errors[name]?.message as string}
        </ErrorMessage>
      )}
    </fieldset>
  );
}
