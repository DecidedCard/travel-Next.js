import useInput from "./useInput";

const useWriteInputForm = () => {
  const [title, onChangeTitle, setTitle] = useInput();
  const [startDate, onChangeStartDate, setStartDate] = useInput();
  const [endDate, onChangeEndDate, setEndDate] = useInput();
  const [travelPlace, onChangeTravelPlace, setTravelPlace] = useInput();
  const [content, onChangeContent, setContent] = useInput();
  const [postMainContent, onChangePostMainContent, setPostMainContent] =
    useInput();

  const inputValue = {
    title,
    startDate,
    endDate,
    travelPlace,
    content,
    postMainContent,
  };
  const inputOnChange = {
    onChangeTitle,
    onChangeStartDate,
    onChangeEndDate,
    onChangeTravelPlace,
    onChangeContent,
    onChangePostMainContent,
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTitle("");
    setStartDate("");
    setEndDate("");
    setTravelPlace("");
    setContent("");
    setPostMainContent("");
  };

  return { inputValue, inputOnChange, onSubmit };
};

export default useWriteInputForm;
