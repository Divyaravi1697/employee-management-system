
const logout = async (req, res) => {
    try {
        res.clearCookie("auth_token");


        res.status(200).json({ success: true, message: "Logout successful", });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}
export default logout;