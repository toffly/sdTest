import { useTranslation } from "react-i18next";
import { Select } from "antd";
import { Link } from "react-router-dom";

const Home = () => {
  const { t, i18n } = useTranslation();

  const lngs = {
    en: { nativeName: `${t("langSwitchEn")}` },
    th: { nativeName: `${t("langSwitchTh")}` },
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      {/* <div className="absolute top-5 right-10">
        {Object.keys(lngs).map((lng: string) => (
          <a
            key={lng}
            style={{
              fontWeight: i18n.resolvedLanguage === lng ? "bold" : "normal",
            }}
            type="submit"
            onClick={() => i18n.changeLanguage(lng)}
          >
            {lngs[lng as keyof typeof lngs].nativeName}
          </a>
        ))}
      </div> */}
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
                onClick={() => {i18n.changeLanguage(lng)}}
              >
                {lngs[lng as keyof typeof lngs].nativeName}
              </a>
            )
          };
        })}
      />

      <div className="flex gap-4">
        <Link className="flex flex-col text-center border-2 bg-gray-200 gap-2 w-[200px] h-[120px] justify-center px-4" to="test1">
          <p>{t("description1.part1")}</p>
          <hr className="border-t-slate-600 border-1 w-full" />
          <p>{t("description1.part2")}</p>
        </Link>
        <Link className="flex flex-col text-center border-2 bg-gray-200 gap-2 w-[200px] h-[120px] justify-center px-4" to="test2">
          <p>{t("description2.part1")}</p>
          <hr className="border-t-slate-600 border-1 w-full" />
          <p>{t("description2.part2")}</p>
        </Link>
      </div>
    </div>
  );
};

export default Home;
