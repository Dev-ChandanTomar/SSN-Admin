import { Card } from "antd";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import { Link, useParams } from "react-router-dom";
import { useSoftUIController } from "context";

const PressRelieseDetail = () => {
  const { title } = useParams();
  const [controller] = useSoftUIController();
  const { pressreliese } = controller;
  const pressRelieseData = pressreliese.find((e) => e.title === title);

  const formatContentWithImages = (content) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;

    const images = tempDiv.querySelectorAll("img");
    images.forEach((img) => {
      img.style.maxWidth = "50%";
      img.style.height = "auto";
    });

    return tempDiv.innerHTML;
  };

  return (
    <DashboardLayout>
      <SoftBox mb={3}>
        <Card>
          <SoftBox pt={2} px={2}>
            <SoftBox mb={0.5}>
              {pressRelieseData ? (
                <SoftTypography variant="h6" fontWeight="medium">
                  Title: {pressRelieseData.title}
                </SoftTypography>
              ) : (
                <SoftTypography variant="h6" fontWeight="medium">
                  Loading...
                </SoftTypography>
              )}
            </SoftBox>
            <SoftBox mb={1}>
              <SoftBox mb={1}>
                <SoftTypography
                  target="_blank"
                  component={Link}
                  to={pressRelieseData.content}
                  fontWeight="regular"
                  color="text"
                  cursor="pointer"
                >
                  Discription:
                  <div
                    dangerouslySetInnerHTML={{
                      __html: formatContentWithImages(pressRelieseData.content),
                    }}
                  />
                </SoftTypography>
              </SoftBox>
              <SoftBox mb={1}>
                <SoftTypography
                  target="_blank"
                  component={Link}
                  to={pressRelieseData.createdAt}
                  fontWeight="regular"
                  color="text"
                  cursor="pointer"
                >
                  Date: {new Date(pressRelieseData.createdAt).toLocaleDateString()}
                </SoftTypography>
              </SoftBox>
            </SoftBox>
          </SoftBox>
        </Card>
      </SoftBox>
    </DashboardLayout>
  );
};

export default PressRelieseDetail;
