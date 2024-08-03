class AboutModel {
  constructor(id, title, description, visiondescription, missiondescription) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.visiondescription = visiondescription;
    this.missiondescription = missiondescription;
  }

  static fromJson(jsonData) {
    return new AboutModel(
      jsonData?._id ?? null,
      jsonData?.title ?? "",
      jsonData?.description ?? "",
      jsonData?.visiondescription ?? "",
      jsonData?.missiondescription ?? ""
    );
  }

  static fromArray(jsonDataArray) {
    if (!Array.isArray(jsonDataArray)) {
      return [];
    }
    return jsonDataArray.map((json) => AboutModel.fromJson(json));
  }
}

export default AboutModel;
