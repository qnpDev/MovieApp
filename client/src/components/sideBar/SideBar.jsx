import { LineStyle, PermIdentity, Storefront} from "@mui/icons-material"
import { Link, useLocation, useNavigate } from "react-router-dom"
import "./sideBar.css"
import { MdOutlineCategory } from "react-icons/md"
import { FiUsers } from "react-icons/fi"
import { BiServer, BiPaperPlane, BiUserPin } from "react-icons/bi"
import { TbLogout } from "react-icons/tb"
import { useDispatch } from "react-redux"
import authSlice from "../../store/slice/authSlice"

const SideBar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logoutAction = () => {
        dispatch(authSlice.actions.logout())
        navigate("/login")
    }
    const location = useLocation()
    const active = location.pathname.split("/")[2];
    return (
        <div className="side-bar">
            <div className="side-bar-wrapper">
                <div className="side-bar__menu">
                    <div className="side-bar--titles">Dashboard</div>
                    <div className="side-bar__list">
                        <Link to="/admin/">
                            <div className={active === "" ? "side-bar__list--item active" : "side-bar__list--item"}>
                                <LineStyle className="side-bar__icon"/>
                                Home
                            </div>
                        </Link>
                        <Link to="/admin/movies">
                            <div className={active === "movies" ? "side-bar__list--item active" : "side-bar__list--item"}>
                                <Storefront className="side-bar__icon"/>
                                Movies
                            </div>
                        </Link>
                        <Link to="/admin/billings">
                            <div className={active === "billings" ? "side-bar__list--item active" : "side-bar__list--item"}>
                                <PermIdentity className="side-bar__icon"/>
                                Billings
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="side-bar__menu">
                    <div className="side-bar--titles">Quick Menu</div>
                    <div className="side-bar__list">
                        <Link to="/admin/users">
                            <div className={active === "users" ? "side-bar__list--item active" : "side-bar__list--item"}>
                                <FiUsers  className="side-bar__icon"></FiUsers>
                                {/* <PermIdentity className="side-bar__icon"/> */}
                                Users
                            </div>
                        </Link>
                        
                        <Link to="/admin/categories">
                            <div className={active === "categories" ? "side-bar__list--item active" : "side-bar__list--item"}>
                            <MdOutlineCategory  className="side-bar__icon"></MdOutlineCategory>
                                {/* <PermIdentity className="side-bar__icon"/> */}
                                Categories
                            </div>
                        </Link>
                        <Link to="/admin/plans">
                            <div className={active === "plans" ? "side-bar__list--item active" : "side-bar__list--item"}>
                                {/* <PermIdentity className="side-bar__icon"/> */}
                                <BiPaperPlane  className="side-bar__icon"></BiPaperPlane>
                                Plans
                            </div>
                        </Link>
                        <Link to="/admin/series">
                            <div className={active === "series" ? "side-bar__list--item active" : "side-bar__list--item"}>
                                {/* <PermIdentity className="side-bar__icon"/>
                                 */}
                                 <BiServer  className="side-bar__icon"></BiServer>
                                Series
                            </div>
                        </Link>
                        <Link to="/admin/reviews">
                            <div className={active === "reviews" ? "side-bar__list--item active" : "side-bar__list--item"}>
                                {/* <PermIdentity className="side-bar__icon"/>
                                 */}
                                 <BiServer  className="side-bar__icon"></BiServer>
                                Reviews
                            </div>
                        </Link>
                
                    </div>
                </div>
                <div className="side-bar__menu">
                    <div className="side-bar--titles">Actions</div>
                    <div className="side-bar__list">
                        <Link to="/">
                        <div className="side-bar__list--item">
                            <BiUserPin className="side-bar__icon"/>
                            User Page
                        </div>
                        </Link>
                        <div className="side-bar__list--item" onClick={logoutAction}>
                            <TbLogout className="side-bar__icon"/>
                            Logout
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideBar
