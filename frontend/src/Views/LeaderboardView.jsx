import React, { useEffect } from "react";
import UnderDevelopment from "../components/UnderDevelopment";

const LeaderboardView = () => {
    useEffect(() => {
        document.title = "Click-Fox | Leaderboard";
        document.querySelector('meta[name="description"]').setAttribute('content', 'Check out the Click-Fox leaderboards and see how you rank among other players.');
    }, []);

    return (
        <main>
            <UnderDevelopment></UnderDevelopment>
        </main>
    );
}

export default LeaderboardView;