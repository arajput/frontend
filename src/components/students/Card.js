import {
  Actionsheet,
  Avatar,
  Box,
  HStack,
  Stack,
  Text,
  VStack,
} from "native-base";
import React, { useState } from "react";
import Icon from "../IconByName";
import { useTranslation } from "react-i18next";
import Header from "../Header";
import * as classServiceRegistry from "../../shiksha-os/services/classServiceRegistry";
import { Link } from "react-router-dom";

export default function Card({
  item,
  img,
  type,
  href,
  rightComponent,
  hidePopUpButton,
  textTitle,
  _textTitle,
  _textSubTitle,
  _arrow,
}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const PopupActionSheet = () => {
    return (
      <>
        <Actionsheet isOpen={open} onClose={(e) => setOpen(false)}>
          <Actionsheet.Content bg="coolGray.500">
            <Header
              isDisabledAppBar={true}
              icon="Group"
              heading={
                item?.fullName ? (
                  item?.fullName
                ) : (
                  <Text italic>{t("NOT_ENTERD")}</Text>
                )
              }
              subHeading=""
              _box={{ bg: "coolGray.500", py: 0 }}
            />
          </Actionsheet.Content>
          <Box bg="coolGray.100" width={"100%"}>
            <Stack space={2} p="4">
              <VStack>
                <HStack alignItems={"center"} justifyContent={"space-between"}>
                  <Box borderColor="gray.500">
                    <Text fontSize="md" color="primary.500" bold={true}>
                      {t("DETAILS")}
                    </Text>
                  </Box>
                  <Link to={"/students/" + item.id + "/edit"}>
                    <Icon size="sm" color="gray.900" name="Edit" />
                  </Link>
                </HStack>
                <Box borderWidth={1} p="2" borderColor="gray.500" bg="gray.50">
                  <Text>
                    <Text bold>{t("ADDRESS")} </Text>
                    {item.address ? (
                      item.address
                    ) : (
                      <Text italic>{t("NOT_ENTERD")}</Text>
                    )}
                  </Text>
                  <Text>
                    <Text bold>{t("FATHERS_NAME")} </Text>
                    {item.fathersName ? (
                      item.fathersName
                    ) : (
                      <Text italic>{t("NOT_ENTERD")}</Text>
                    )}
                  </Text>
                  <Text>
                    <Text bold>{t("ADMISSION_NO")} </Text>
                    {item.admissionNo ? (
                      item.admissionNo
                    ) : (
                      <Text italic>{t("NOT_ENTERD")}</Text>
                    )}
                  </Text>
                  <Text>
                    <Text bold>{t("STUDYING_IN")} </Text>
                    {item.className ? (
                      item.className
                    ) : item.currentClassID ? (
                      item.currentClassID
                    ) : (
                      <Text italic>{t("NOT_ENTERD")}</Text>
                    )}
                  </Text>
                </Box>
              </VStack>
              <VStack>
                <HStack alignItems={"center"} justifyContent={"space-between"}>
                  <Box borderColor="gray.500">
                    <Text fontSize="md" color="primary.500" bold={true}>
                      {t("NOTES")}
                    </Text>
                  </Box>
                  <Icon size="sm" color="gray.900" name="Edit" />
                </HStack>
                <Box borderWidth={1} p="2" borderColor="gray.500" bg="gray.50">
                  <Text>
                    <Text>{t("STUDENT_IS_GOOD_NEED")} </Text>
                  </Text>
                </Box>
              </VStack>
              <Stack py={2} alignItems={"center"}>
                <Link
                  to={"/students/" + item.id}
                  style={{ color: "rgb(63, 63, 70)", textDecoration: "none" }}
                >
                  <Box
                    rounded="full"
                    borderColor="coolGray.200"
                    borderWidth="1"
                    bg="coolGray.200"
                    px={6}
                    py={2}
                  >
                    {t("SEE_MORE")}
                  </Box>
                </Link>
              </Stack>
            </Stack>
          </Box>
        </Actionsheet>
      </>
    );
  };

  const handalOpenPoup = async (e) => {
    let classObj = await classServiceRegistry.getOne({
      id: e.currentClassID,
    });
    item.className = classObj.className;
    setOpen(true);
  };

  const PressableNew = ({ item, children, href, ...prop }) => {
    return href ? (
      <Link
        to={href}
        style={{ color: "rgb(63, 63, 70)", textDecoration: "none" }}
      >
        {children}
      </Link>
    ) : (
      <Box {...prop}>{children}</Box>
    );
  };

  return (
    <>
      <HStack space={3} justifyContent="space-between" width={"100%"}>
        <PressableNew href={href ? href : null}>
          <HStack space={typeof img === "undefined" || img === true ? 2 : 0}>
            {typeof img === "undefined" || img === true ? (
              <Avatar
                size="40px"
                source={{
                  uri: item.avatarUrl,
                }}
              />
            ) : (
              <></>
            )}
            <VStack>
              <Text
                _dark={{
                  color: "warmGray.50",
                }}
                color="coolGray.800"
                bold
                {..._textTitle}
              >
                {textTitle ? (
                  textTitle
                ) : item?.fullName ? (
                  item?.fullName
                ) : (
                  <Text italic>{t("NOT_ENTERD")}</Text>
                )}
              </Text>
              <Text
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
                {..._textSubTitle}
              >
                <HStack space={1}>
                  <Text>
                    <HStack>
                      <Text>{t("ROLL_NUMBER")}:</Text>
                      {item.admissionNo ? (
                        item.admissionNo
                      ) : (
                        <Text italic>{t("NOT_ENTERD")}</Text>
                      )}
                    </HStack>
                  </Text>
                  <Text>
                    <HStack>
                      <Text>{t("FATHERS_NAME")}:</Text>
                      {item.fathersName ? (
                        item.fathersName
                      ) : (
                        <Text italic>{t("NOT_ENTERD")}</Text>
                      )}
                    </HStack>
                  </Text>
                </HStack>
              </Text>
            </VStack>
          </HStack>
        </PressableNew>
        {rightComponent ? (
          rightComponent
        ) : !hidePopUpButton ? (
          <Icon
            onPress={(e) => handalOpenPoup(item)}
            size="sm"
            color="gray.900"
            name="ArrowDropDown"
            {..._arrow}
          />
        ) : (
          <></>
        )}
      </HStack>
      <PopupActionSheet />
    </>
  );
}
