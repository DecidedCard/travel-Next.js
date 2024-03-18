import useWriteInputForm from "../../hook/useWriteInputForm";
import { Input, Textarea } from "@nextui-org/react";
import QuillEditor from "./QuillEditor";

const InputForm = () => {
  const { inputValue, inputOnChange } = useWriteInputForm();
  return (
    <form className="w-5/6 mx-auto">
      <Input
        type="text"
        label="제목을 입력해주세요"
        className="border-b-2 border-solid border-gray-500"
        value={inputValue.title}
        onChange={inputOnChange.onChangeTitle}
      />
      <div className="flex justify-evenly border-b-2 border-solid border-gray-500">
        <div>
          <div className="flex items-center">
            <Input
              type="date"
              className="w-36"
              value={inputValue.startDate}
              onChange={inputOnChange.onChangeStartDate}
            />
            <p>~</p>
            <Input
              type="date"
              className="w-36"
              value={inputValue.endDate}
              onChange={inputOnChange.onChangeEndDate}
            />
          </div>
          <Input
            type="text"
            label="여행지를 적어주세요~"
            value={inputValue.travelPlace}
            onChange={inputOnChange.onChangeTravelPlace}
          />
        </div>
        <Textarea
          type="text"
          label="설명을 입력해주세요."
          className="w-96"
          value={inputValue.content}
          onChange={inputOnChange.onChangeContent}
        />
      </div>
      <QuillEditor />
    </form>
  );
};

export default InputForm;
