import MyInp from "@/components/ui/Form/MyInp";
import { useUpdatePackage } from "@/hooks/package.hook";
import { TPackage } from "@/types/package";
import { Button, Form, Modal } from "antd";
import React, { useEffect } from "react";

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

  const {
    mutate: createPackage,
    isPending: isLoadingCreatePackage,
    isSuccess: isSuccessCreatePackage,
  } = useUpdatePackage();

  const {
    mutate: updatePackage,
    isPending: isLoadingUpdatePackage,
    isSuccess: isSuccessUpdatePackage,
  } = useUpdatePackage();

  useEffect(() => {
    if (editingPackage) {
      form.setFieldsValue({
        name: editingPackage.name, // Populate the form with the package name if editing
        price: editingPackage.price,
        durationInMonths: editingPackage.durationInMonths,
        description: editingPackage.description,
      });
    }
  }, [form, editingPackage]);

  const handleCreatePackage = (values: TPackage) => {
    createPackage(values);
  };

  const handleUpdatePackage = async (values: TPackage) => {
    if (!editingPackage?._id) {
      return;
    }
    updatePackage({ ...values, _id: editingPackage._id });
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

  return (
    <Modal
      open={open}
      onCancel={() => {
        setEditingPackage(null);
        setModalVisible(false);
      }}
      className="p-4 rounded"
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
          rules={[{ required: true, message: "Please input package name!" }]}
          label="Package Name"
          placeholder="Enter package name"
          type="text"
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

        {/* Package Description */}
        <MyInp
          name="description"
          rules={[
            { required: true, message: "Please input package description!" },
          ]}
          label="Description"
          placeholder="Enter package description"
          type="textarea"
          size="large"
        />

        {/* Submit button */}
        <Form.Item>
          <Button
            type="primary"
            loading={isLoadingCreatePackage || isLoadingUpdatePackage}
            htmlType="submit"
            block
            size="large"
          >
            {editingPackage ? "Update Package" : "Insert Package"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PackageModal;
