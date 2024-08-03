class PressRelieseModal {
  constructor(id, title, content, createdAt) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.createdAt = createdAt;
  }

  static fromJson(jsonData) {
    return new PressRelieseModal(
      jsonData._id ?? null,
      jsonData.title ?? "",
      jsonData.content ?? "",
      new Date(jsonData.createdAt) ?? new Date()
    );
  }

  static fromArray(jsonDataArray) {
    if (!Array.isArray(jsonDataArray)) {
      console.error("Expected jsonDataArray to be an array but received:", jsonDataArray);
      return [];
    }

    return jsonDataArray.map((json) => PressRelieseModal.fromJson(json));
  }
}

export default PressRelieseModal;
