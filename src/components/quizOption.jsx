import "bootstrap/dist/css/bootstrap.min.css";

function QuizOption({ handleChange, handleRemove, text, id }) {
  return (
    <div className="d-flex align-content-center w-50">
      <input
        type="text"
        className="form-control w-100"
        placeholder={`Texto da opção`}
        id={id}
        value={text}
        onChange={(e) => handleChange(id, e.target.value)}
        required
      />
      <button
        className="btn btn-close bg-danger rounded-1 my-auto mx-2 p-2"
        onClick={() => handleRemove(id)}
        type="button"
      />
    </div>
  );
}

export default QuizOption;
