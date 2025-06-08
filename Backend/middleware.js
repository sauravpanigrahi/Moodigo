export function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return res.status(200).json({ message: "User is logged in" });
        
    } else {
        return res.status(401).json({ message: "Unauthorized" });
    }
}