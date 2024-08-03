class TempleModel {
  constructor(
    id,
    title,
    description,
    shortDescription,
    location,
    establishedDate,
    state,
    city,
    country,
    category,
    mainImage,
    bannerImage,
    subImages,
    help,
    createdAt,
    updatedAt
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.shortDescription = shortDescription;
    this.location = location;
    this.establishedDate = establishedDate;
    this.state = state;
    this.city = city;
    this.country = country;
    this.category = category;
    this.mainImage = mainImage;
    this.bannerImage = bannerImage;
    this.subImages = subImages;
    // this.sub2 = sub2;
    // this.sub3 = sub3;
    this.help = help;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromJson(jsonData) {
    return new TempleModel(
      jsonData._id ?? null,
      jsonData.title ?? "",
      jsonData.description ?? "",
      jsonData.shortdescription ?? "",
      jsonData.location ?? "",
      new Date(jsonData.establishedDate) ?? new Date(),
      jsonData.state ?? "",
      jsonData.city ?? "",
      jsonData.country ?? "",
      jsonData.category ?? "",
      jsonData.mainImage?.image ?? "",
      jsonData.bannerImage?.image ?? "",
      // jsonData.subImages?.image ?? "",
      jsonData.subImages?.map((img) => ({ image: img.image})) ?? [],
      // jsonData.sub2?.image ?? "",
      // jsonData.sub3?.image ?? "",
      jsonData.help ?? "",
      new Date(jsonData.createdAt) ?? new Date(),
      new Date(jsonData.updatedAt) ?? new Date()
    );
  }

  static fromArray(jsonDataArray) {
    return jsonDataArray.map((json) => TempleModel.fromJson(json));
  }
}

export default TempleModel;
