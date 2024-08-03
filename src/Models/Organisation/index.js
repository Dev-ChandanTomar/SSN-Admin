class OrganisationModel {
  constructor(id, title, description, phone, email, mainImage, subImages, createdAt) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.phone = phone;
    this.email = email;
    this.mainImage = mainImage;
    this.subImages = subImages;
    this.createdAt = createdAt;
  }

  static fromJson(jsonData) {
    return new OrganisationModel(
      jsonData._id ?? null,
      jsonData.title ?? "",
      jsonData.description ?? "",
      jsonData.phone ?? "",
      jsonData.email ?? "",
      jsonData.mainImage?.image ?? "",
      jsonData.subImages?.map((img) => ({ image: img.image })) ?? [],
      new Date(jsonData.createdAt) ?? new Date()
    );
  }

  static fromArray(jsonDataArray) {
    return jsonDataArray.map((json) => OrganisationModel.fromJson(json));
  }
}

export default OrganisationModel;
