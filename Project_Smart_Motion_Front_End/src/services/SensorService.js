import http from "../common/http-common";

class SensorDataService {
  getAll() {
    return http.get("/sensors");
  }

  get(uid) {
    return http.get(`/sensors/${uid}`);
  }

  create(data) {
    return http.post("/sensors", data);
  }

  update(uid, data) {
    return http.put(`/sensors/${uid}`, data);
  }

  delete(uid) {
    return http.delete(`/sensors/${uid}`);
  }

  deleteAll() {
    return http.delete(`/sensors`);
  }

  findByUID(uid) {
    return http.get(`/sensors?uid=${uid}`);
  }
}

/* const TutorialService = {
  getAll,
  get,
  create,
  update,
  delete,
  deleteAll,
  findByTitle
}; */

export default new SensorDataService();