class CommentModel {
  constructor(id, name, templeName, email, message, approved, createdAt, updatedAt) {
    this.id = id;
    this.name = name;
    this.templeName = templeName;
    this.email = email;
    this.message = message;
    this.approved = approved;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  fromArray(jsonData) {
    return jsonData.map((json) => {
      return new CommentModel(
        json._id ?? null,
        json.name ?? "",
        json.templeName ?? "",
        json.email ?? "",
        json.message ?? "",
        json.approved ?? false,
        json.createdAt ?? new Date(),
        json.updatedAt ?? new Date()
      );
    });
  }
}

export default CommentModel;
