import { useRouter } from "next/router";
import { Profiles } from "../path/to/Profiles"; // Adjust the import path as necessary
import { Card, CardContent, Typography } from "@mui/material";
import Image from "next/image";

const ProfileDetail = () => {
    const router = useRouter();
    const { id } = router.query; // Get the id from query params

    // Find the profile by ID
    const profile = Profiles.find((profile) => profile.id === Number(id));

    if (!profile) {
        return <Typography variant="h6">Profile not found</Typography>;
    }

    return (
        <Card variant="outlined" sx={{ maxWidth: 500, margin: "16px", padding: "16px" }}>
            <Image src={profile.image} alt={profile.name} width={500} height={300} />
            <CardContent>
                <Typography variant="h5" component="div">
                    {profile.name}
                </Typography>
                <Typography variant="body1">Age: {profile.age}</Typography>
                <Typography variant="body1">Gender: {profile.gender}</Typography>
                <Typography variant="body1">Location: {profile.location}</Typography>
                <Typography variant="body1">Religion: {profile.religion}</Typography>
                <Typography variant="body1">Caste: {profile.caste}</Typography>
                <Typography variant="body1">Education: {profile.education}</Typography>
                <Typography variant="body1">Occupation: {profile.occupation}</Typography>
                <Typography variant="body1" sx={{ fontStyle: "italic" }}>
                    {profile.bio}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ProfileDetail;
