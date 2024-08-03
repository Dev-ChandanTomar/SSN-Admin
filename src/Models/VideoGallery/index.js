class VideoGalleryModel {
  constructor(id, title, src, date, createdAt, updatedAt) {
    this.id = id;
    this.title = title;
    this.src = src;
    this.date = date;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromJson(jsonData) {
    return new VideoGalleryModel(
      jsonData._id ?? null,
      jsonData.title ?? "",
      jsonData.src ?? "",
      jsonData.date ?? "",
      jsonData.createdAt ?? new Date(),
      jsonData.updatedAt ?? new Date()
    );
  }

  static fromArray(jsonDataArray) {
    // Check if jsonDataArray is defined and is an array
    if (!Array.isArray(jsonDataArray)) {
      console.error("Expected jsonDataArray to be an array but received:", jsonDataArray);
      return [];
    }

    return jsonDataArray.map((json) => VideoGalleryModel.fromJson(json));
  }
}

export default VideoGalleryModel;
