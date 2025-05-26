import "bootstrap/dist/css/bootstrap.min.css";

function QuizOption({ handleChange, text, id }) {
  return (
    <>
      <div className="d-flex align-content-center w-50">
        <input
          type="text"
          className="form-control w-100"
          key={id}
          placeholder={`Texto da opção`}
          id={id}
          value={text}
          onChange={(e) => handleChange(e.target.value)}
        />
        <button className="btn btn-close bg-danger rounded-1 my-auto mx-2 p-2" onClick={(e) => e.target.parentNode.remove()}></button>
      </div>
    </>
  );
}

export default QuizOption;
