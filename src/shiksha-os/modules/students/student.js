import React, { useEffect, useState } from "react";
import {
  Image,
  HStack,
  Text,
  VStack,
  Button,
  Stack,
  AspectRatio,
  Box,
  FlatList,
  PresenceTransition,
} from "native-base";
import * as studentServiceRegistry from "../../services/studentServiceRegistry";
import * as classServiceRegistry from "../../services/classServiceRegistry";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import Icon from "../../../components/IconByName";
import Menu from "../../../components/Menu";
import Card from "../../../components/students/Card";
import Header from "../../../components/Header";

// Start editing here, save and see your changes.
export default function App() {
  const { t } = useTranslation();
  const [students, setStudents] = useState([]);
  const [classObject, setClassObject] = useState({});
  const { classId } = useParams();
  const fullName = sessionStorage.getItem("fullName");
  const [studentCollaps, setStudentCollaps] = useState(true);
  const [classCollaps, setClassCollaps] = useState(true);

  useEffect(() => {
    let ignore = false;
    const getData = async () => {
      setStudents(
        await studentServiceRegistry.getAll({
          filters: {
            currentClassID: {
              eq: classId,
            },
          },
        })
      );

      let classObj = await classServiceRegistry.getOne({ id: classId });
      if (!ignore) setClassObject(classObj);
    };
    getData();
  }, [classId]);

  return (
    <>
      <Box>
        <Header isDisabledHeader={true} title={t("MY_CLASSES")} />

        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image
              source={{
                uri: "https://images.freeimages.com/images/large-previews/51b/school-children-in-india-1438445.jpg",
              }}
              alt="image"
            />
          </AspectRatio>
          <Box position="absolute" top="2" right="2">
            <Icon
              color="white"
              name={"CameraAlt"}
              _icon={{ sx: { fontSize: 35 } }}
            />
          </Box>
          <Box
            position={"absolute"}
            style={{ backgroundColor: "rgba(24, 24, 27, 0.4)" }}
            bottom={0}
            p={2}
            width={"100%"}
          >
            <HStack justifyContent="space-between" alignItems="center">
              <Box px={3}>
                <HStack space={7} alignItems="center">
                  <Icon
                    color="white"
                    name={"Person"}
                    _icon={{ sx: { fontSize: 35 } }}
                  />
                  <Text color="gray.100" fontWeight="700" fontSize="lg">
                    {classObject.className}
                  </Text>
                </HStack>
              </Box>
              <Button
                variant="ghost"
                borderRadius="50"
                colorScheme="gray"
                background={"coolGray.50"}
              >
                {t("SHARE")}
              </Button>
            </HStack>
          </Box>
        </Box>
        <Menu
          _box={{ p: 4 }}
          _icon={{
            color: "primary.500",
            _icon: {
              style: {
                fontSize: "35px",
                border: "2px solid",
                borderColor: "primary.500",
                borderRadius: "50%",
                padding: "20px",
              },
            },
          }}
          routeDynamics={true}
          items={[
            {
              id: classId,
              keyId: 1,
              title: t("ATTENDANCE"),
              icon: "AssignmentTurnedIn",
              route: "/attendance/:id",
            },
            // {
            //   keyId: 3,
            //   id: classId,
            //   title: t("CLASS_TEST"),
            //   icon: "MenuBook",
            // },
          ]}
          type={"veritical"}
        />
        <Stack px={4} space={3}>
          <Stack space={2}>
            <Box
              borderWidth={1}
              borderColor="gray.500"
              bg="gray.500"
              px={2}
              py={1}
            >
              <HStack alignItems={"center"} justifyContent={"space-between"}>
                <Text color="gray.100" bold={true} fontSize="md">
                  {t("STUDENTS")}
                </Text>
                <Icon
                  size="sm"
                  color="gray.100"
                  name={!studentCollaps ? "ArrowDropDown" : "ArrowDropUp"}
                  onPress={() => setStudentCollaps(!studentCollaps)}
                />
              </HStack>
            </Box>
            <PresenceTransition visible={studentCollaps}>
              <VStack space={2}>
                <Box borderWidth={1} borderColor="gray.500" bg="gray.50">
                  <FlatList
                    data={students}
                    renderItem={({ item }) => (
                      <Box
                        borderBottomWidth="1"
                        _dark={{
                          borderColor: "gray.600",
                        }}
                        borderColor="coolGray.200"
                        pl="4"
                        pr="5"
                        py="2"
                      >
                        <Card item={item} href={"/students/" + item.id} />
                      </Box>
                    )}
                    keyExtractor={(item) => item.id}
                  />
                </Box>
                <Button
                  variant="ghost"
                  borderRadius="50"
                  colorScheme="gray"
                  background="gray.200"
                >
                  {t("SHOW_ALL_STUDENTS")}
                </Button>
              </VStack>
            </PresenceTransition>
          </Stack>

          <Stack space={2}>
            <Box
              borderWidth={1}
              borderColor="gray.500"
              bg="gray.500"
              px={2}
              py={1}
            >
              <HStack alignItems={"center"} justifyContent={"space-between"}>
                <Text color="gray.100" bold={true} fontSize="md">
                  {t("CLASS_DETAILS")}
                </Text>
                <Icon
                  size="sm"
                  color="gray.100"
                  name={!classCollaps ? "ArrowDropDown" : "ArrowDropUp"}
                  onPress={() => setClassCollaps(!classCollaps)}
                />
              </HStack>
            </Box>
            <PresenceTransition visible={classCollaps}>
              <Stack space={2}>
                <Stack>
                  <Box borderColor="gray.500" bg="gray.50">
                    <Text fontSize="md" color="primary.500" bold={true}>
                      {t("SUMMARY")}
                    </Text>
                  </Box>
                  <Box
                    borderWidth={1}
                    p="2"
                    borderColor="gray.500"
                    bg="gray.50"
                  >
                    <HStack space={3}>
                      <Text>
                        <Text bold>{t("STUDENTS")}: </Text> {students.length}
                      </Text>
                      <Text>
                        <Text bold>{t("GIRLS")}: </Text>
                        {students.filter((e) => e.gender === "Female").length}
                      </Text>
                      <Text>
                        <Text bold>{t("BOYS")}: </Text>
                        {students.filter((e) => e.gender === "Male").length}
                      </Text>
                    </HStack>

                    <Text>
                      <Text bold>{t("AGE_GROUP")}: </Text>
                    </Text>
                    <Text>
                      <Text bold>{t("CLASS_TEACHER")}: </Text> {fullName}
                    </Text>
                  </Box>
                </Stack>

                <Stack>
                  <Box borderColor="gray.500" bg="gray.50">
                    <Text fontSize="md" color="primary.500" bold={true}>
                      {t("CLASS_ATTENDANCE")}
                    </Text>
                  </Box>
                  <Box
                    borderWidth={1}
                    p="2"
                    borderColor="gray.500"
                    bg="gray.50"
                  >
                    <HStack
                      space={3}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Text>
                        <Text bold>{t("GRADE")}:</Text> {t("GOOD")}
                      </Text>
                      <Link
                        to={"/attendance/" + classId}
                        style={{
                          color: "rgb(63, 63, 70)",
                          textDecoration: "none",
                        }}
                      >
                        <Box
                          rounded="full"
                          borderColor="coolGray.200"
                          borderWidth="1"
                          bg="coolGray.200"
                          px={6}
                          py={2}
                        >
                          {t("ATTENDANCE_REGISTER")}
                        </Box>
                      </Link>
                    </HStack>
                  </Box>
                </Stack>

                <Stack>
                  <Box borderColor="gray.500" bg="gray.50">
                    <Text fontSize="md" color="primary.500" bold={true}>
                      {t("CONTACTS_TEACHERS")}
                    </Text>
                  </Box>
                  <Box
                    borderWidth={1}
                    p="2"
                    borderColor="gray.500"
                    bg="gray.50"
                  >
                    <VStack>
                      <Text>
                        <Text bold>{t("MATHS")}: </Text>
                        {fullName}
                      </Text>
                      <Text>
                        <Text bold>{t("ENGLISH")}: </Text>
                        {fullName}
                      </Text>
                      <Text>
                        <Text bold>{t("SCIENCE")}: </Text>
                        {fullName}
                      </Text>
                    </VStack>
                  </Box>
                </Stack>

                <Stack>
                  <Box borderColor="gray.500" bg="gray.50">
                    <Text fontSize="md" color="primary.500" bold={true}>
                      {t("AWARDS_AND_RECOGNITION")}
                    </Text>
                  </Box>
                </Stack>

                <Stack>
                  <Box borderColor="gray.500" bg="gray.50">
                    <Text fontSize="md" color="primary.500" bold={true}>
                      {t("STUDENT_COMPETENCIES")}
                    </Text>
                  </Box>
                </Stack>
              </Stack>
            </PresenceTransition>
          </Stack>
        </Stack>
      </Box>
    </>
  );
}
