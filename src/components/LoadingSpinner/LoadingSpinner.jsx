const LoadingSpinner = ({ style = "color" }) => {
  return (
    <div
      className={`w-4 h-4 border-4 border-t-transparent ${
        style == "color" ? "border-evening-sea-500" : "border-white"
      } rounded-full animate-spin`}
    ></div>
  );
};

export default LoadingSpinner;
