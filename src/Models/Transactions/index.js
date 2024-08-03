class UserTransactionModel {
  constructor(
    id,
    donorName,
    donorEmail,
    templeId,
    amount,
    date,
    paymentMethod,
    status,
    note,
    createdAt,
    updatedAt
  ) {
    this.id = id;
    this.donorName = donorName;
    this.donorEmail = donorEmail;
    this.templeId = templeId;
    this.amount = amount;
    this.date = date;
    this.paymentMethod = paymentMethod;
    this.status = status;
    this.note = note;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  fromArray(jsonData) {
    return jsonData?.map((json) => {
      return new UserTransactionModel(
        json._id ?? null,
        json.donorName ?? "",
        json.donorEmail ?? "",
        json.templeId ?? "",
        parseFloat(json.amount) ?? 0,
        json.date ?? new Date(),
        json.paymentMethod ?? "",
        json.status ?? "pending",
        json.note ?? "",
        json.createdAt ?? new Date(),
        json.updatedAt ?? new Date()
      );
    });
  }
}

export default UserTransactionModel;
