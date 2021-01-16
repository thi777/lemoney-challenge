const connection = require("../database/connection");

class OffersService {
  async store({ payload }) {
    return await connection("offers").returning("*").insert(payload);
  }

  async list({ page }) {
    return await connection("offers")
      .join("advertisers", "offers.advertiser_id", "advertisers.id")
      .limit(10)
      .offset((page - 1) * 10)
      .where({ state: "enable" })
      .orderBy("premium", "desc")
      .select(
        { id: "offers.id" },
        { advertiser_name: "advertisers.advertiser_name" },
        { premium: "offers.premium" },
        { state: "offers.state" },
        { starts_at: "offers.starts_at" },
        { ends_at: "offers.ends_at" },
        { description: "offers.description" },
        { url: "offers.url" }
      );
  }

  async update(offers) {
    return await connection("offers")
      .where({ id: offers.id })
      .update(offers, ["state"]);
  }
}

module.exports = new OffersService();
