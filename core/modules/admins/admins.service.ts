import AdminRepo from "./admins.repo"

class AdminService {
    private repo = new AdminRepo()
    async createNewAdmin(newAdminInfo: object) {
        console.log(newAdminInfo);
    }
}
export default AdminService