class UserModel {
  constructor(
    id,
    name,
    email,
    designation,
    location,
    state,
    city,
    country,
    phone,
    type,
    templeCount,
    eventCount,
    createdAt,
    updatedAt
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.designation = designation;
    this.location = location;
    this.state = state;
    this.city = city;
    this.country = country;
    this.phone = phone;
    this.type = type;
    this.templeCount = templeCount;
    this.eventCount = eventCount;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  fromJson(jsonData) {
    return new UserModel(
      jsonData._id ?? "",
      jsonData.name ?? "",
      jsonData.email ?? "",
      jsonData.designation ?? "",
      jsonData.location ?? "",
      jsonData.state ?? "",
      jsonData.city ?? "",
      jsonData.country ?? "",
      jsonData.phone ?? "",
      jsonData.type ?? "user",
      jsonData.templeCount ?? 0,
      jsonData.eventCount ?? 0,
      new Date(jsonData.createdAt) ?? new Date(),
      new Date(jsonData.updatedAt) ?? new Date()
    );
  }
  fromArray(jsonData) {
    return jsonData.map((json) => {
      return new UserModel(
        json._id ?? "",
        json.name ?? "",
        json.email ?? "",
        json.designation ?? "",
        json.location ?? "",
        json.state ?? "",
        json.city ?? "",
        json.country ?? "",
        json.phone ?? "",
        json.type ?? "user",
        json.templeCount ?? 0,
        json.eventCount ?? 0,
        new Date(json.createdAt) ?? new Date(),
        new Date(json.updatedAt) ?? new Date()
      );
    });
  }
}

export default UserModel;
