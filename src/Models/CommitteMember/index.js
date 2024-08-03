class CommitteMemberModal {
  constructor(
    id,
    name,
    fathername,
    mothername,
    email,
    phone,
    adhare,
    address,
    city,
    state,
    country,
    purpose,
    photo,
    Adharefront,
    Adhareback,
    createdAt
  ) {
    this.id = id;
    this.name = name;
    this.fathername = fathername;
    this.mothername = mothername;
    this.email = email;
    this.phone = phone;
    this.adhare = adhare;
    this.address = address;
    this.city = city;
    this.state = state;
    this.country = country;
    this.purpose = purpose;
    this.photo = photo;
    this.Adharefront = Adharefront;
    this.Adhareback = Adhareback;
    this.createdAt = createdAt;
  }

  static fromJson(jsonData) {
    return new CommitteMemberModal(
      jsonData._id ?? null,
      jsonData.name ?? "",
      jsonData.fathername ?? "",
      jsonData.mothername ?? "",
      jsonData.email ?? "",
      jsonData.phone ?? "",
      jsonData.adhare ?? "",
      jsonData.address ?? "",
      jsonData.city ?? "",
      jsonData.state ?? "",
      jsonData.country ?? "",
      jsonData.purpose ?? "",
      jsonData.photo ?? "",
      jsonData.Adharefront ?? "",
      jsonData.Adhareback ?? "",
      new Date(jsonData.createdAt) ?? new Date()
    );
  }

  static fromArray(jsonDataArray) {
    if (!Array.isArray(jsonDataArray)) {
      console.error("Expected jsonDataArray to be an array but received:", jsonDataArray);
      return [];
    }

    return jsonDataArray.map((json) => CommitteMemberModal.fromJson(json));
  }
}

export default CommitteMemberModal;
