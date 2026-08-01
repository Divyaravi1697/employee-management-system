function checkRole(...allowedRoles) {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "Access denied"
            });
        }
        next();
    };
}
export const admin = checkRole("admin");
export const allaccess = checkRole("employee", "admin");
