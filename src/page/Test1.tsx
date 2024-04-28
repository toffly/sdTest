import { useState } from "react";
import { Select, Typography, Flex } from "antd";
import { useTranslation } from "react-i18next";
import { arrayMoveImmutable } from "array-move";

const Shape = [
  "circle",
  "oval",
  "trapezoid",
  "rectangle",
  "parallelogram",
  "square",
];

const test1 = () => {
  const [shapes, setShapes] = useState(Shape);
  const [justify, setJustify] = useState(true);

  const { t, i18n } = useTranslation();

  const lngs = {
    en: { nativeName: `${t("langSwitchEn")}` },
    th: { nativeName: `${t("langSwitchTh")}` },
  };

  const shuffle = (array) => {
    const sortedArr = structuredClone(array);
    for (let i = sortedArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [sortedArr[i], sortedArr[j]] = [sortedArr[j], sortedArr[i]];
    }
    return sortedArr;
  };

  return (
    <div className="w-full h-screen p-4">
      <Select
        className="absolute top-5 right-10 w-[100px]"
        value={i18n.resolvedLanguage}
        options={Object.keys(lngs).map((lng: string) => {
          return {
            label: (
              <a
                key={lng}
                type="submit"
                className="w-full h-full"
                style={{
                  fontWeight: i18n.resolvedLanguage === lng ? "bold" : "normal",
                }}
                onClick={() => {
                  i18n.changeLanguage(lng);
                }}
              >
                {lngs[lng as keyof typeof lngs].nativeName}
              </a>
            ),
          };
        })}
      />
      <Typography.Title level={1}>{t("test1header")}</Typography.Title>
      <Flex justify="center" gap="large">
        <Flex vertical gap="large" className="max-w-[1600px]">
          <Flex gap="large">
            <div
              className="hover:bg-yellow-500 bg-white  py-4 px-[150px] rounded-lg relative cursor-pointer"
              onClick={() => {
                setShapes(arrayMoveImmutable(shapes, 0, 5));
              }}
            >
              <div className="triangle-left" />
              <p className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 -bottom-10  bg-green-400 px-4 py-2 text-white rounded-full">
                {t("menu1")}
              </p>
            </div>
            <Flex
              className="hover:bg-yellow-500 bg-white py-4 px-[150px] rounded-lg relative cursor-pointer"
              onClick={() => setJustify((prev) => !prev)}
            >
              <div className="triangle-up" />
              <div className="triangle-down" />
              <p className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 -bottom-10  bg-green-400 px-4 py-2 text-white rounded-full">
                {t("menu2")}
              </p>
            </Flex>
            <div
              className="hover:bg-yellow-500 bg-white py-4 px-[150px] rounded-lg relative cursor-pointer"
              onClick={() => {
                setShapes(arrayMoveImmutable(shapes, -1, 0));
              }}
            >
              <div className="triangle-right" />
              <p className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 -bottom-10  bg-green-400 px-4 py-2 text-white rounded-full ">
                {t("menu1")}
              </p>
            </div>
          </Flex>
          <hr />
          <Flex justify={justify ? "end" : "start"} gap="large">
            {shapes
              .filter((shape, index) => index < 3)
              .map((shape, index) => (
                <div
                  className="hover:bg-yellow-500 bg-white w-[350px] h-[150px] rounded-lg relative flex justify-center items-center cursor-pointer"
                  key={index}
                  onClick={() => {
                    setShapes(shuffle(shapes));
                  }}
                >
                  <div className={shape} />
                </div>
              ))}
          </Flex>
          <Flex justify={justify ? "start" : "end"} gap="large">
            {shapes
              .filter((shape, index) => index >= 3)
              .map((shape, index) => (
                <div
                  className="hover:bg-yellow-500 bg-white w-[350px] h-[150px] rounded-lg relative flex justify-center items-center"
                  key={index}
                >
                  <div className={shape} />
                </div>
              ))}
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
};

export default test1;
