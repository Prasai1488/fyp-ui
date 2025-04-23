import {
  useEffect,
  useState,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";

interface UploadWidgetProps {
  uwConfig: object;
  setPublicId?: (id: string) => void;
  setState: Dispatch<SetStateAction<string[]>>;
}

interface CloudinaryContextType {
  loaded: boolean;
}

const CloudinaryScriptContext = createContext<CloudinaryContextType>({
  loaded: false,
});

const UploadWidget: React.FC<UploadWidgetProps> = ({
  uwConfig,
  setPublicId,
  setState,
}) => {
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!loaded) {
      const uwScript = document.getElementById("uw");
      if (!uwScript) {
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", "uw");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        setLoaded(true);
      }
    }
  }, [loaded]);

  const initializeCloudinaryWidget = () => {
    if (loaded) {
      const myWidget = window.cloudinary.createUploadWidget(
        uwConfig,
        (error: any, result: any) => {
          if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);
            setState((prev) => [...prev, result.info.secure_url]);
            if (setPublicId) {
              setPublicId(result.info.public_id);
            }
          }
        }
      );

      document
        .getElementById("upload_widget")
        ?.addEventListener("click", () => {
          myWidget.open();
        });
    }
  };

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <button
        id="upload_widget"
        className="cloudinary-button"
        onClick={initializeCloudinaryWidget}
      >
        Upload
      </button>
    </CloudinaryScriptContext.Provider>
  );
};

export default UploadWidget;
export { CloudinaryScriptContext };
