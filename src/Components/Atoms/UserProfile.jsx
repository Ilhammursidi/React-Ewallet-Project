const UserProfile = ({ name, img, mobile }) => {
  return (
    <div className={`flex items-center space-x-2 ${mobile ? "justify-start" : "justify-end"}`}>
      <img src={img} alt={name} className="w-10 h-10 rounded-full" />
      {!mobile && <span className="font-semibold">{name}</span>}
    </div>
  );
};

export default UserProfile;