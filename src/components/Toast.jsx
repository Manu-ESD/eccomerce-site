import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiFillExclamationCircle,
} from "react-icons/ai";

const Toast = ({
  text,
  status,
  loading,
  requireConfirm,
  setShowToast,
  confirmDelete,
}) => {
  return (
    <>
      {requireConfirm && (
        <div className="w-screen h-[110vh] bg-[#00000037] absolute bottom-0 left-[-80px] z-40 translate-y-8"></div>
      )}
      <div className="fixed bottom-7 left-0 right-0 mx-auto w-fit z-50">
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
          {requireConfirm && (
            <div className="text-[12px] flex justify-center items-center gap-3 font-medium relative z-[]">
              <button
                className="text-[#2ca02c]"
                onClick={() => {
                  confirmDelete();
                }}
              >
                Confirm
              </button>
              <button
                className="text-[#d23737]"
                onClick={() => {
                  setShowToast(false);
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Toast;
