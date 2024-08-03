class PhotoGalleryModel {
  constructor(id, title, mainImage, date) {
    this.id = id;
    this.title = title;
    this.src = mainImage;
    this.date = date;
  }

  static fromJson(jsonData) {
    return new PhotoGalleryModel(
      jsonData._id ?? null,
      jsonData.title ?? "",
      jsonData.mainImage ?? "",
      jsonData.date ?? ""
    );
  }

  static fromArray(jsonDataArray) {
    // Check if jsonDataArray is defined and is an array
    if (!Array.isArray(jsonDataArray)) {
      console.error("Expected jsonDataArray to be an array but received:", jsonDataArray);
      return [];
    }

    return jsonDataArray.map((json) => PhotoGalleryModel.fromJson(json));
  }
}

export default PhotoGalleryModel;
