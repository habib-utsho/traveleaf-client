import MyInp from "@/components/ui/Form/MyInp";
import { useCreatePackage, useUpdatePackage } from "@/hooks/package.hook";
import { TPackage } from "@/types/package";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, List, message, Modal } from "antd";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// Option for editor
const toolbarOptions = [
  [{ header: [1, 2, false] }],
  ["bold", "italic", "underline"],
  ["blockquote", "code-block"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ color: [] }, { background: [] }], // Dropdown for color
  ["link", "image"],
  ["clean"], // Remove formatting button
];

type TProps = {
  open: boolean;
  editingPackage: Partial<TPackage> | null;
  setEditingPackage: React.Dispatch<
    React.SetStateAction<Partial<TPackage> | null>
  >;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const PackageModal = ({
  open,
  setModalVisible,
  editingPackage,
  setEditingPackage,
}: TProps) => {
  const [form] = Form.useForm();
  const [benefits, setBenefits] = useState<string[]>([]);
  const [newBenefit, setNewBenefit] = useState<string>("");

  const [description, setDescription] = useState("");

  const {
    mutate: createPackage,
    isPending: isLoadingCreatePackage,
    isSuccess: isSuccessCreatePackage,
  } = useCreatePackage();

  const {
    mutate: updatePackage,
    isPending: isLoadingUpdatePackage,
    isSuccess: isSuccessUpdatePackage,
  } = useUpdatePackage();

  useEffect(() => {
    if (editingPackage) {
      form.setFieldsValue({
        ...editingPackage,
        benefits: editingPackage.benefits || [],
      });
      setBenefits(editingPackage.benefits || []);
      setDescription(editingPackage.description || "");
    }
  }, [form, editingPackage]);

  const handleCreatePackage = (values: TPackage) => {
    if (benefits?.length === 0) {
      message.error("Please add at least one benefit!");
      return;
    }
    if (!description) {
      message.error("Description is required!");
      return;
    }

    createPackage({ ...values, benefits, description });
  };

  const handleUpdatePackage = async (values: TPackage) => {
    if (!editingPackage?._id) {
      return;
    }
    if (benefits?.length === 0) {
      message.error("Please add at least one benefit!");
      return;
    }

    if (!description) {
      message.error("Description is required!");
      return;
    }

    const updatedValues = {
      ...values,
      benefits,
      description,
      _id: editingPackage._id,
    };
    updatePackage({ ...updatedValues });
  };

  useEffect(() => {
    if (
      !isLoadingCreatePackage &&
      !isLoadingUpdatePackage &&
      (isSuccessCreatePackage || isSuccessUpdatePackage)
    ) {
      form.resetFields();
      setModalVisible(false);
      setEditingPackage(null);
      setBenefits([]);
    }
  }, [
    createPackage,
    updatePackage,
    setModalVisible,
    setEditingPackage,
    form,
    isLoadingCreatePackage,
    isLoadingUpdatePackage,
    isSuccessCreatePackage,
    isSuccessUpdatePackage,
  ]);

  const addBenefit = () => {
    if (newBenefit && !benefits.includes(newBenefit)) {
      setBenefits([...benefits, newBenefit]);
      setNewBenefit("");
    }
  };

  const removeBenefit = (benefit: string) => {
    setBenefits(benefits.filter((b) => b !== benefit));
  };

  return (
    <Modal
      open={open}
      onCancel={() => {
        setEditingPackage(null);
        setModalVisible(false);
      }}
      className="p-4 rounded"
      width={800}
      footer={null}
    >
      <h2 className="font-bold text-xl mb-4">
        {editingPackage ? "Update Package" : "Add Package"}
      </h2>

      <Form
        layout="vertical"
        form={form}
        onFinish={editingPackage ? handleUpdatePackage : handleCreatePackage}
      >
        {/* Package Name */}
        <MyInp
          name="name"
          label="Package Name"
          placeholder="Enter package name"
          type="select"
          rules={[{ required: true, message: "Please select a package name!" }]}
          options={[
            "Basic",
            "Standard",
            "Premium",
            "Explorer",
            "Backpacker",
            "Adventurer",
          ].map((name) => ({ label: name, value: name }))}
          size="large"
        />

        {/* Package Price */}
        <MyInp
          name="price"
          rules={[{ required: true, message: "Please input package price!" }]}
          label="Price"
          placeholder="Enter package price"
          type="number"
          size="large"
        />

        {/* Package Duration (in Months) */}
        <MyInp
          name="durationInMonths"
          rules={[
            { required: true, message: "Please input duration in months!" },
          ]}
          label="Duration (Months)"
          placeholder="Enter duration in months"
          type="number"
          size="large"
        />

        {/* Short bio */}
        <MyInp
          name="shortBio"
          rules={[
            { required: true, message: "Short bio is required!" },
            { max: 75, message: "Short bio must be less than 75 characters" },
          ]}
          label="Short bio"
          placeholder="Enter a short bio within 75 characters"
          type="text"
          size="large"
        />

        {/* Benefits List */}
        <Form.Item label="Benefits">
          <Input
            placeholder="Enter a benefit and press 'Add'"
            value={newBenefit}
            onChange={(e) => setNewBenefit(e.target.value)}
            onPressEnter={addBenefit}
            style={{ marginBottom: "8px" }}
          />
          <Button
            onClick={addBenefit}
            type="primary"
            disabled={!newBenefit}
            icon={<PlusOutlined />}
          />
          <List
            dataSource={benefits}
            renderItem={(benefit) => (
              <List.Item
                className="bg-primary-50 !px-2 rounded-md !my-2"
                actions={[
                  <Button
                    key={benefit}
                    type="link"
                    onClick={() => removeBenefit(benefit)}
                    danger
                    icon={<DeleteOutlined />}
                  />,
                ]}
              >
                {benefit}
              </List.Item>
            )}
            style={{ marginTop: "16px" }}
          />
        </Form.Item>

        {/* Package Description */}

        <ReactQuill
          theme="snow"
          value={description}
          onChange={setDescription}
          placeholder="Write details about package description"
          modules={{
            toolbar: toolbarOptions,
          }}
        />

        {/* Submit button */}
        <Form.Item>
          <Button
            type="primary"
            loading={isLoadingCreatePackage || isLoadingUpdatePackage}
            htmlType="submit"
            block
            size="large"
            className="mt-2"
          >
            {editingPackage ? "Update Package" : "Insert Package"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PackageModal;
