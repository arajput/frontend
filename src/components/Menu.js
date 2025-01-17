import React from "react";

import { HStack, Text, VStack, Box, FlatList, Pressable } from "native-base";
import Icon from "./IconByName";
import { generatePath } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function Menu({
  items,
  type,
  routeDynamics,
  bg,
  _box,
  _boxMenu,
  _icon,
}) {
  const { t } = useTranslation();

  const chunk = (array, chunk) => {
    return [].concat.apply(
      [],
      array.map(function (elem, i) {
        return i % chunk ? [] : [array.slice(i, i + chunk)];
      })
    );
  };

  const PressableNew = ({ item, children, ...prop }) => {
    return item?.route ? (
      <Pressable {...prop}>
        <Link
          style={{ color: "rgb(63, 63, 70)", textDecoration: "none" }}
          to={
            routeDynamics
              ? generatePath(item.route, { ...{ id: item.id } })
              : item.route
          }
        >
          {children}
        </Link>
      </Pressable>
    ) : (
      <Box {...prop}>{children}</Box>
    );
  };

  if (type === "veritical") {
    const newItems = chunk(items, 3);
    return (
      <Box bg={bg} {..._box}>
        {newItems.map((subItems, index) => (
          <HStack key={index} justifyContent="center" space={6}>
            {subItems.map((item) => (
              <PressableNew key={item.keyId ? item.keyId : item.id} item={item}>
                <VStack space="4" my="2" mx="1" textAlign="center">
                  {item.icon ? (
                    <Icon
                      name={item.icon}
                      p="0"
                      color="primary.500"
                      _icon={{
                        style: {
                          fontSize: "35px",
                          border: "2px solid #54b8d4",
                          borderRadius: "50%",
                          padding: "20px",
                        },
                      }}
                      {..._icon}
                    />
                  ) : (
                    <></>
                  )}
                  <Text color="gray.700" fontWeight="500" maxW={20} center>
                    {item.title}
                  </Text>
                </VStack>
              </PressableNew>
            ))}
          </HStack>
        ))}
      </Box>
    );
  } else {
    return (
      <Box bg={bg} {..._box}>
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <Box
              borderBottomWidth="1"
              _dark={{
                borderColor: "gray.600",
              }}
              borderLeftWidth={"5"}
              borderLeftColor={
                item.activeMenu
                  ? "primary.500"
                  : item?._boxMenu?.bg
                  ? item._boxMenu.bg
                  : _boxMenu?.bg
                  ? _boxMenu?.bg
                  : bg
              }
              borderColor={"coolGray.200"}
              {..._boxMenu}
              {...item._boxMenu}
            >
              <PressableNew px="5" py="3" item={item}>
                <HStack
                  space={3}
                  justifyContent={"space-between"}
                  width={"100%"}
                >
                  <HStack
                    space={item.leftText || item.icon ? "7" : ""}
                    alignItems="center"
                  >
                    {item.leftText ? (
                      <Text color="gray.700" fontWeight="500">
                        {item.leftText}
                      </Text>
                    ) : item.icon ? (
                      <Icon name={item.icon} p="0" {..._icon} />
                    ) : (
                      <></>
                    )}
                    <Text color="gray.700" fontWeight="500">
                      {t(item.title)}
                    </Text>
                  </HStack>
                  <Icon
                    name={item.rightIcon ? item.rightIcon : "ArrowForwardIos"}
                    p="0"
                    {..._icon}
                  />
                </HStack>
              </PressableNew>
            </Box>
          )}
          keyExtractor={(item, index) => (item.id ? item.id : index)}
        />
      </Box>
    );
  }
}
