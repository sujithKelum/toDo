import { FormControl, FormHelperText, Input, InputLabel } from "@material-ui/core";

const emptyFun = () => undefined;


export const InputText = ({
    elementWrapperStyle = "",
    elementStyle = "",
    fullWidth = true,
    lableText = "",
    inputType = "text",
    inputValue = "",
    inputName = "",
    inputError = "",
    helperText = "",
    multiline = false,
    autoFocus= false,
    rows="1",
    inputPlaceholder = "",
    inputDisabled = false,
    required = false,
    onChangeTxt = emptyFun,
    onclickElement = emptyFun
}) => {

    const getInputProps = () => {
        let obj = {};
    
        return obj;
      };
    return (
        <FormControl
            fullWidth={fullWidth}
            error={inputError ? true : false}
            className={`defaultInputWrapper ${elementWrapperStyle} ${multiline?"textAreaWrapper":""}`}
        >
            <InputLabel
                htmlFor={inputName}
                className={"defaultInputLabel"}
                required={required}
            >{lableText}</InputLabel>
            <Input
                className={"defaultInputText " + elementStyle}
                type={inputType}
                value={inputValue}
                name={inputName}
                autoFocus={true}
                placeholder={inputPlaceholder}
                disabled={inputDisabled}
                multiline={multiline}
                rows={rows}
                onChange={(event) => onChangeTxt({ name: inputName, value: event.target.value, eventInfo: event })}
                onClick={(event) => onclickElement({ name: inputName, eventInfo: event })}
                inputProps={getInputProps()}
            />
            <FormHelperText className="defaultHellperTxt">{inputError ? inputError : helperText}</FormHelperText>
        </FormControl>
    );
}

