/* eslint-disable react/prop-types */
// Next Work Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftBadge from "components/SoftBadge";

import { Icon } from "@mui/material";
import { setDialog } from "context";
import { updateTransactions } from "Services/endpointes";
import ApiClient from "Services/ApiClient";
import { toast } from "react-toastify";
import UserTransactionForm from "../form";
import { deleteUserTrans } from "Services/endpointes";

function Author({ name, id }) {
  return (
    <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
      <SoftBox display="flex" flexDirection="column">
        <SoftTypography variant="button" fontWeight="medium">
          {name}
        </SoftTypography>
        <SoftTypography variant="caption" color="secondary">
          {id}
        </SoftTypography>
      </SoftBox>
    </SoftBox>
  );
}
function Status({ tnxId, status }) {
  if (tnxId === null) {
    return (
      <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
        <SoftBox display="flex" alignItems="center" flexDirection="column" gap="4px">
          <SoftBadge
            variant="gradient"
            badgeContent="payment pending"
            color="warning"
            size="xs"
            container
          />
        </SoftBox>
      </SoftBox>
    );
  } else if (!status) {
    return (
      <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
        <SoftBadge variant="gradient" badgeContent="Inactive" color="warning" size="xs" container />
      </SoftBox>
    );
  } else {
    return (
      <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
        <SoftBox display="flex" flexDirection="column">
          <SoftBadge variant="gradient" badgeContent="Active" color="success" size="xs" container />
        </SoftBox>
      </SoftBox>
    );
  }
}

const deleteRoyalitys = (id, getAllTransactions) => async (form) => {
  try {
    console.log(id);
    const response = await ApiClient.deleteData(deleteUserTrans, id);
    toast.success(response?.message);
    getAllTransactions();
  } catch (error) {
    console.error("Error deleting transaction:", error);
    toast.error(
      error.response?.data?.message ?? "Failed to delete transaction. Please try again later."
    );
  }
};
const TransactionsView = {
  columns: [
    { name: "donorName", align: "center" },
    { name: "donorEmail", align: "center" },
    { name: "amount", align: "center" },
    { name: "note", align: "center" },
    { name: "templeId", align: "center" },
    { name: "date", align: "center" },
    { name: "paymentMethod", align: "center" },
    { name: "status", align: "center" },
    { name: "actions", align: "center" },
  ],

  rows: (data, dispatch, getAllTransactions) => {
    return data.map((e) => {
      const formattedDate = new Date(e.date).toLocaleDateString("en-GB", {
        month: "2-digit",
        day: "2-digit",
        year: "2-digit",
      });
      return {
        donorName: <Author name={e.donorName} />,
        donorEmail: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {e.donorEmail}
          </SoftTypography>
        ),
        amount: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {e.amount}
          </SoftTypography>
        ),
        note: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {e.note}
          </SoftTypography>
        ),
        templeId: <Author name={e.templeId} />,
        date: (
          <SoftTypography variant="caption" color="secondary" fontWeight="medium">
            {formattedDate}
          </SoftTypography>
        ),

        paymentMethod:
          e.paymentMethod === "tnxId" ? (
            <Author name={e.paymentMethod} id={e.tnxId} />
          ) : (
            <SoftTypography variant="caption" color="secondary" fontWeight="medium">
              {e.paymentMethod}
            </SoftTypography>
          ),

        status: <Status status={e.status} />,

        actions: (
          <SoftBox
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap="10px"
            px={1}
            py={0.5}
          >
            <SoftTypography
              component="a"
              href="#"
              variant="caption"
              color="error"
              cursor="pointer"
              fontWeight="medium"
              onClick={() => {
                setDialog(dispatch, [
                  {
                    status: "form",
                    call: deleteRoyalitys(e.id, getAllTransactions),
                    route: "",
                    message: `DELETE - CONNECTION - ${e.id}`,
                    action: "Delete",
                  },
                ]);
              }}
            >
              <Icon fontSize="small" color="error">
                delete
              </Icon>
            </SoftTypography>
          </SoftBox>
        ),
      };
    });
  },
};

export default TransactionsView;
