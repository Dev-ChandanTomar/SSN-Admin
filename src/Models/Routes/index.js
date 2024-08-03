class Pages {
  constructor(id, name, key, route, auth, type, index, noCollapse, status, createdAt, updatedAt) {
    this.id = id;
    this.name = name;
    this.key = key;
    this.route = route;
    this.auth = auth;
    this.type = type;
    this.index = index;
    this.noCollapse = noCollapse;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  fromArray(jsonData) {
    return jsonData.map(
      (JSON) =>
        new Pages(
          JSON._id ?? null,
          JSON.name ?? "",
          JSON.key ?? "",
          JSON.route ?? "/",
          JSON.auth ?? "",
          JSON.type ?? "",
          parseInt(JSON.index) ?? 0,
          JSON.noCollapse ?? false,
          JSON?.status ?? true,
          JSON.createdAt ?? new Date(),
          JSON.updatedAt ?? new Date()
        )
    );
  }

  toDatabaseJson() {
    return {
      name: this.name,
      key: this.key,
      route: this.route,
      auth: this.auth,
      type: this.type,
      index: this.index,
      noCollapse: this.noCollapse,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

export default Pages;
