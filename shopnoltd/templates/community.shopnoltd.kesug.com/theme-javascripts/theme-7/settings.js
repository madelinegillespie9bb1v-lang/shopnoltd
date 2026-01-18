(function() {
    if ('require' in window) {
        require("discourse/lib/theme-settings-store").registerSettings(7, {
            "Hamburger_links": "KoBoToolbox Home,http://www.kobotoolbox.org,f|Help Pages,http://help.kobotoolbox.org,f"
        });
    }
})();