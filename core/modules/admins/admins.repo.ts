import AdminModel from "./admins.model"

class AdminRepo {
    private model = AdminModel
    async createNewAdmin(newAdminInfo: object) {
        let newAdmin = await this.model.create(newAdminInfo)
    }

    async findByEmailOrPhoneNumber(email: string, phoneNumber: string) {
        const parent = await this.model.findOne({
          $or: [{ email }, { phone: phoneNumber }],
        });
        return parent;
      }
}
export default AdminRepo