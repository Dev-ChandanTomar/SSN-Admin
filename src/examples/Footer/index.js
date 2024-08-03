import PropTypes from "prop-types";

// @mui material components
import Link from "@mui/material/Link";

// Next Work Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Next Work Dashboard React base styles
import typography from "assets/theme/base/typography";
import { useState } from "react";

function Footer({ company, links }) {
  const { href, name } = company;
  const { size } = typography;
  const [menu, setMenu] = useState(null);
  const openMenu = ({ currentTarget }) => {
    if (menu === currentTarget) {
      closeMenu();
    } else {
      setMenu(currentTarget);
    }
  };
  const closeMenu = () => setMenu(null);

  return (
    <div>
      <SoftBox
        display="flex"
        flexDirection={{ xs: "column", lg: "row" }}
        justifyContent="space-between"
        alignItems="center"
        px={1.5}
        mb={2}
      >
        <SoftBox
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
          color="text"
          fontSize={size.sm}
          px={1.5}
        >
          <SoftBox fontSize={size.md} color="text" mb={-0.5} mx={0.25}>
            <img
              src="favicon.png"
              alt="Logo"
              style={{ height: "40px", width: "auto", marginRight: "5px" }}
            />
          </SoftBox>
        </SoftBox>

        <SoftBox
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
          color="text"
          fontSize={size.sm}
          px={1.5}
        >
          &copy; {new Date().getFullYear()}, Developed by
          <SoftBox fontSize={size.md} color="text" mb={-0.5} mx={0.25}></SoftBox>
          <Link href={href} target="_blank" cursior="pointer">
            <SoftTypography variant="button" fontWeight="medium" cursior="pointer">
              &nbsp;Sanatan Sewanyas&nbsp;
            </SoftTypography>
          </Link>
        </SoftBox>
      </SoftBox>
    </div>
  );
}

// Setting default values for the props of Footer
Footer.defaultProps = {
  company: { href: "#", name: "Nextwork Technologies" },
  links: [
    // { href: "", name: "9875982211" },
    // { href: "", name: "Blog" },
    // { href: "", name: "License" },
  ],
};

// Typechecking props for the Footer
Footer.propTypes = {
  company: PropTypes.objectOf(PropTypes.string),
  links: PropTypes.arrayOf(PropTypes.object),
};

export default Footer;
