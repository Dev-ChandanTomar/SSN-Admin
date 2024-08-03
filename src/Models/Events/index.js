class EventModal {
  constructor(
    id,
    title,
    description,
    locationCity,
    locationState,
    locationCountry,
    locationZipcode,
    eventImage,
    startDate,
    endDate,
    organizer,
    category,
    createdAt,
    updatedAt
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.locationCity = locationCity;
    this.locationState = locationState;
    this.locationCountry = locationCountry;
    this.locationZipcode = locationZipcode;
    this.eventImage = eventImage;
    this.startDate = startDate;
    this.endDate = endDate;
    this.organizer = organizer;
    this.category = category;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromJson(jsonData) {
    return new EventModal(
      jsonData._id ?? null,
      jsonData.title ?? "",
      jsonData.description ?? "",
      jsonData.location?.city ?? "",
      jsonData.location?.state ?? "",
      jsonData.location?.country ?? "",
      jsonData.location?.zipcode ?? "",
      jsonData.eventImage ?? "",
      new Date(jsonData.startDate) ?? new Date(),
      new Date(jsonData.endDate) ?? new Date(),
      jsonData.organizer ?? "",
      jsonData.category ?? "",
      new Date(jsonData.createdAt) ?? new Date(),
      new Date(jsonData.updatedAt) ?? new Date()
    );
  }

  static fromArray(jsonDataArray) {
    return jsonDataArray.map((json) => EventModal.fromJson(json));
  }
}

export default EventModal;
