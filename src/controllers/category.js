import Category from "../models/category";
import { Product } from "../models/product";
export const getAll = async (req, res) => {
  try {
    const categories= await Category.find();
    if (categories.length === 0) {
      return res.json({
        message: "Không có danh mục nào",
      });
    }
    return res.json(categories);
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
export const get = async function (req, res) {
  try {
    const category = await Category.findById(req.params.id).populate("products");
    if (!category) {
      return res.json({
        message: "Không có danh mục nào",
      });
    }
    const products = await Product.find({categoryId:req.params.id})
    
    return res.json(category);
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
export const create = async function (req, res) {
  try {
    const category = await Category.create(req.body);
    if (!category) {
      return res.json({
        message: "Thêm danh mục không thành công!",
      });
    }
    return res.status(201).json({
      message: "Thêm danh mục thành công",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
export const updatePatch = async function (req, res) {
  try {
    const category = await Category.findByIdAndUpdate({_id: req.params.id}, req.body, {
      new: true,
    });
    if (!category) {
      return res.json({
        message: "Cập nhật category không thành công",
      });
    }
    return res.json({
      message: "Cập nhật category thành công",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Đã có lỗi xảy ra",
    });
  }
};
export const update = async function (req, res) {
  try {
    const category = await Category.findByIdAndUpdate({_id: req.params.id}, req.body, {
      new: true,
    });
    if (!category) {
      return res.json({
        message: "Cập nhật category không thành công",
      });
    }
    return res.json({
      message: "Cập nhật category thành công",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Đã có lỗi xảy ra",
    });
  }
};

export const remove = async function (req, res) {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    return res.json({
      message: "Xóa category thành công",
      category,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};
