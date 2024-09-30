import { Form, Input, InputNumber, Select } from "antd";
import React from "react";

type MyInpProps = {
  name: string | string[];
  label: string;
  type:
    | "text"
    | "number"
    | "password"
    | "email"
    | "checkbox"
    | "radio"
    | "select"
    | "textarea"
    | "date";
  rules?: any[];
  disabled?: boolean;
  placeholder: string;
  defaultValue?: string;
  value?: string;
  options?: { label: string; value: string }[];
  size?: "small" | "middle" | "large";
  prefix?: React.ReactNode;
  mode?: "multiple" | "tags" | undefined;
};

// className="my-inp"
// defaultValue={"admin@gmail.com"}
const MyInp: React.FC<MyInpProps> = ({
  type,
  placeholder,
  name,
  label,
  rules,
  options,
  disabled,
  size = "large",
  defaultValue,
  value,
  prefix,
  mode,
}) => {
  return (
    <Form.Item name={name} label={label} rules={rules} className="flex-1">
      {type === "text" ? (
        <Input
          defaultValue={defaultValue}
          prefix={prefix}
          value={value}
          size={size}
          placeholder={placeholder}
          disabled={disabled}
        />
      ) : type === "number" ? (
        <InputNumber
          defaultValue={defaultValue}
          prefix={prefix}
          value={value}
          size={size}
          placeholder={placeholder}
          disabled={disabled}
        />
      ) : type === "password" ? (
        <Input.Password
          defaultValue={defaultValue}
          prefix={prefix}
          value={value}
          size={size}
          placeholder={placeholder}
          disabled={disabled}
        />
      ) : type === "select" ? (
        <Select
          defaultValue={defaultValue}
          value={value}
          size={size}
          placeholder={placeholder}
          options={options}
          disabled={disabled}
          mode={mode}
        />
      ) : type === "date" ? (
        <Input
          defaultValue={defaultValue}
          prefix={prefix}
          value={value}
          type="date"
          size={size}
          placeholder={placeholder}
          disabled={disabled}
        />
      ) : (
        <Input
          defaultValue={defaultValue}
          prefix={prefix}
          value={value}
          size={size}
          placeholder={placeholder}
          disabled={disabled}
        />
      )}
    </Form.Item>
  );
};

export default MyInp;
