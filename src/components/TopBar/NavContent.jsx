import { useCallback, useState } from "react";
import { NavLink } from "react-router-dom";
import { Link, Typography, SvgIcon } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Skeleton } from "@material-ui/lab";
import { Trans } from "@lingui/macro";
import { ReactComponent as StakeIcon } from "../../assets/icons/stake.svg";
import { ReactComponent as BondIcon } from "../../assets/icons/bond.svg";
import { useAddress, useWeb3Context } from "src/hooks/web3Context";
import useBonds from "../../hooks/Bonds";
import "./topbar.scss";

function NavContent({ theme, toggleTheme, handleDrawerToggle }) {
  const [isActive] = useState();
  const { chainID } = useWeb3Context();
  const { bonds } = useBonds(chainID);

  const checkPage = useCallback((match, location, page) => {
    const currentPath = location.pathname.replace("/", "");
    if (currentPath.indexOf("dashboard") >= 0 && page === "dashboard") {
      return true;
    }
    if (currentPath.indexOf("stake") >= 0 && page === "stake") {
      return true;
    }
    if ((currentPath.indexOf("bonds") >= 0 || currentPath.indexOf("choose_bond") >= 0) && page === "bonds") {
      return true;
    }
    if (currentPath.indexOf("33-together") >= 0 && page === "33-together") {
      return true;
    }
    return false;
  }, []);

  return (
    <div className="dapp-menu-links">
      <div className="dapp-nav" id="navbarNav">
        <Link
          component={NavLink}
          id="stake-nav"
          to="/"
          isActive={(match, location) => {
            return checkPage(match, location, "stake");
          }}
          className={`button-dapp-menu ${isActive ? "active" : ""}`}
        >
          <Typography variant="h6">
            <SvgIcon color="primary" component={StakeIcon} />
            <Trans>Stake</Trans>
          </Typography>
        </Link>

        <Link
          component={NavLink}
          id="bond-nav"
          to="/bonds"
          isActive={(match, location) => {
            return checkPage(match, location, "bonds");
          }}
          className={`button-dapp-menu ${isActive ? "active" : ""}`}
        >
          <Typography variant="h6">
            <SvgIcon color="primary" component={BondIcon} />
            <Trans>Bond</Trans>
          </Typography>
        </Link>

        {/* <div className="dapp-menu-data discounts">
          <div className="bond-discounts">
            <Typography variant="body2">
              <Trans>Bond discounts</Trans>
            </Typography>
            {bonds.map((bond, i) => (
              <Link component={NavLink} to={`/bonds/${bond.name}`} key={i} className={"bond"}>
                {!bond.bondDiscount ? (
                  <Skeleton variant="text" width={"150px"} />
                ) : (
                  <Typography variant="body2">
                    {bond.displayName}

                    <span className="bond-pair-roi">
                      {!bond.isAvailable[chainID]
                        ? "Sold Out"
                        : `${bond.bondDiscount && trim(bond.bondDiscount * 100, 2)}%`}
                    </span>
                  </Typography>
                )}
              </Link>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default NavContent;
