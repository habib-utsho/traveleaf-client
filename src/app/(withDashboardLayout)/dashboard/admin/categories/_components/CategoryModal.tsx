import MyInp from "@/components/ui/Form/MyInp";
import { useCreateCategory, useUpdateCategory } from "@/hooks/category.hook";
import { TCategory } from "@/types/category";
import { Button, Form, Modal } from "antd";
import React, { useEffect } from "react";

type TProps = {
  open: boolean;
  editingCategory: Partial<TCategory> | null;
  setEditingCategory: React.Dispatch<
    React.SetStateAction<Partial<TCategory> | null>
  >;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const CategoriesModal = ({
  open,
  setModalVisible,
  editingCategory,
  setEditingCategory,
}: TProps) => {
  const [form] = Form.useForm();

  const {
    mutate: createCategory,
    isPending: isLoadingCreateCategory,
    isSuccess: isSuccessCreateCategory,
  } = useCreateCategory();
  const {
    mutate: updateCategory,
    isPending: isLoadingUpdateCategory,
    isSuccess: isSuccessUpdateCategory,
  } = useUpdateCategory();

  useEffect(() => {
    if (editingCategory) {
      form.setFieldsValue({
        name: editingCategory.name, // Populate the form with the category name if editing
      });
    }
  }, [form, editingCategory]);

  const handleCreateCategory = (values: TCategory) => {
    createCategory(values);
  };
  const handleUpdateCategory = async (values: TCategory) => {
    if (!editingCategory?._id) {
      return;
    }
    updateCategory({ ...values, _id: editingCategory._id });
  };

  useEffect(() => {
    if (
      !isLoadingCreateCategory &&
      !isLoadingUpdateCategory &&
      (isSuccessCreateCategory || isSuccessUpdateCategory)
    ) {
      form.resetFields();
      setModalVisible(false);
      setEditingCategory(null);
    }
  }, [
    createCategory,
    updateCategory,
    setModalVisible,
    setEditingCategory,
    form,
    isLoadingCreateCategory,
    isLoadingUpdateCategory,
    isSuccessCreateCategory,
    isSuccessUpdateCategory,
  ]);

  return (
    <Modal
      open={open}
      onCancel={() => {
        setEditingCategory(null);
        setModalVisible(false);
      }}
      className="p-4 rounded"
      footer={null}
    >
      <h2 className="font-bold text-xl mb-4">
        {editingCategory ? "Update Category" : "Add Category"}
      </h2>

      <Form
        layout="vertical"
        form={form}
        onFinish={editingCategory ? handleUpdateCategory : handleCreateCategory}
      >
        {/* Category name */}
        <MyInp
          name="name"
          rules={[{ required: true, message: "Please input category name!" }]}
          label="Category Name"
          placeholder="Enter category name"
          type="text"
          size="large"
        />

        {/* Submit button */}
        <Form.Item>
          <Button
            type="primary"
            loading={isLoadingCreateCategory || isLoadingUpdateCategory}
            htmlType="submit"
            block
            size="large"
          >
            {editingCategory ? "Update Category" : "Insert Category"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoriesModal;
