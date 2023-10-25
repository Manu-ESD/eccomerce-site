import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiFillExclamationCircle,
} from "react-icons/ai";

const Toast = ({ text, status, loading }) => {
  return (
    <div className="fixed bottom-7">
      <div className="bg-black text-white max-w-[350px] py-2 px-4 mx-auto flex justify-start gap-4 items-center">
        {status === "success" && (
          <AiFillCheckCircle className="text-[#2e9f2e] scale-125"></AiFillCheckCircle>
        )}
        {status === "failure" && (
          <AiFillCloseCircle className="text-[#c31414] scale-125"></AiFillCloseCircle>
        )}
        {status === "exclamation" && (
          <AiFillExclamationCircle className="text-[#1e396f] scale-125"></AiFillExclamationCircle>
        )}
        <p className="text-white">{text}</p>
        {loading && (
          <span className="loading loading-spinner text-success"></span>
        )}
      </div>
    </div>
  );
};

export default Toast;
