#!/bin/bash

# Function to switch to local development mode
switch_to_local() {
    echo "Switching to local development mode..."
    
    # Add workspaces entry to package.json
    jq '.workspaces = ["prototypr-packages/*"]' package.json > temp.json && mv temp.json package.json

      # Uninstall @prototypr packages
    if [ -d "prototypr-packages" ]; then
        for package_dir in prototypr-packages/*; do
            if [ -d "$package_dir" ] && [ -f "$package_dir/package.json" ]; then
                package_name=$(jq -r .name "$package_dir/package.json")
                echo "Uninstalling $package_name..."
                npm uninstall "$package_name" --legacy-peer-deps
            fi
        done
    fi
    
    # Rename prototypr-packages folder if it exists
    if [ -d "prototypr-packagesx" ]; then
        mv prototypr-packagesx prototypr-packages
    fi

    # Loop through each package in prototypr-packages and delete its node_modules
    if [ -d "prototypr-packages" ]; then
        for package_dir in prototypr-packages/*; do
            if [ -d "$package_dir" ]; then
                echo "Deleting node_modules in $package_dir"
                rm -rf "$package_dir/node_modules"
            fi
        done
    fi
    
    # Remove all @prototypr packages from node_modules
    rm -rf node_modules/@prototypr
    rm -rf node_modules/tiptypr
    
    # Clear npm cache
    # npm cache clean --force
    
    # Install dependencies
    npm install --legacy-peer-deps
    
    echo "Switched to local development mode. Workspace and @prototypr packages have been linked."
}

# Function to switch to npm packages mode
switch_to_npm() {
    echo "Switching to npm packages mode..."

    # Source nvm
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

    # Now use nvm
    nvm use 18.17.0 || { echo "Failed to switch to Node.js 18.17.0. Please install it using 'nvm install 18.17.0'"; exit 1; }

    # Load GitHub Personal Access Token from .env.local
    if [ -f .env.local ]; then
        export $(grep -v '^#' .env.local | xargs)
    fi

    # Ensure the token is set
    if [ -z "$GITHUB_PERSONAL_ACCESS_TOKEN" ]; then
        echo "Error: GITHUB_PERSONAL_ACCESS_TOKEN is not set in .env.local"
        exit 1
    fi
    
    # Remove workspaces entry from package.json
    jq 'del(.workspaces)' package.json > temp.json && mv temp.json package.json
    
    # Remove existing @prototypr packages from node_modules
    rm -rf node_modules/tiptypr
    rm -rf node_modules/@prototypr

    # Uninstall @prototypr packages
    if [ -d "prototypr-packages" ]; then
        for package_dir in prototypr-packages/*; do
            if [ -d "$package_dir" ] && [ -f "$package_dir/package.json" ]; then
                package_name=$(jq -r .name "$package_dir/package.json")
                echo "Uninstalling $package_name..."
                npm uninstall "$package_name" --legacy-peer-deps
            fi
        done
    fi

    # Rename prototypr-packages folder if it exists
    if [ -d "prototypr-packages" ]; then
        mv prototypr-packages prototypr-packagesx
        echo "Renamed prototypr-packages to prototypr-packagesx"
        while [ -d "prototypr-packages" ]; do
            sleep 1
        done
        echo "Renaming operation completed"
    fi

    npm install --legacy-peer-deps
    # Install @prototypr packages
    if [ -d "prototypr-packages" ]; then
        for package_dir in prototypr-packages/*; do
            if [ -d "$package_dir" ] && [ -f "$package_dir/package.json" ]; then
                package_name=$(jq -r .name "$package_dir/package.json")
                echo "Installing $package_name..."
                npm install "$package_name@latest" --legacy-peer-deps
            fi
        done
    elif [ -d "prototypr-packagesx" ]; then
        for package_dir in prototypr-packagesx/*; do
            if [ -d "$package_dir" ] && [ -f "$package_dir/package.json" ]; then
                package_name=$(jq -r .name "$package_dir/package.json")
                echo "Installing $package_name..."
                npm install "$package_name@latest" --legacy-peer-deps
            fi
        done
    else
        echo "prototypr-packages directory not found. Skipping package installation."
    fi


    
    echo "Switched to npm packages mode."
}

# Function to watch a package development
watch_package() {
    echo "Watching package..."
    
    # Check if package name is provided
    if [ -z "$1" ]; then
        echo "Error: Package name is required."
        echo "Usage: $0 watch <package-name>"
        exit 1
    fi

    package_name="$1"
    package_dir="prototypr-packages/$package_name"

    # Check if the package directory exists
    if [ ! -d "$package_dir" ]; then
        echo "Error: Package '$package_name' not found in prototypr-packages folder."
        exit 1
    fi

    # Check if package.json exists in the package directory
    if [ ! -f "$package_dir/package.json" ]; then
        echo "Error: package.json not found in '$package_dir'."
        exit 1
    fi

    echo "Watching package: $package_name"
    
    # Here you can add the actual watch command
    # For example, if using npm, you might do:
    # npm run --prefix "$package_dir" watch

    # Or if using a specific build tool, adjust accordingly
    # For now, we'll just echo a placeholder message
    echo "Navigating to watch $package_name"
    # Navigate to the package directory
    cd "$package_dir" || exit 1
    
    # Run npm install with legacy peer deps
    echo "Installing dependencies for $package_name..."
    npm install --legacy-peer-deps
    
    # Run npm watch
    echo "Starting watch mode for $package_name..."
    npm run watch
}

# Function to deploy a new package
deploy_package() {
    echo "Deploying package..."
    
    # Check if package name is provided
    if [ -z "$1" ]; then
        echo "Error: Package name is required."
        echo "Usage: $0 deploy <package-name>"
        exit 1
    fi

    package_name="$1"
    package_dir="prototypr-packages/$package_name"

    # Check if the package directory exists
    if [ ! -d "$package_dir" ]; then
        echo "Error: Package '$package_name' not found in prototypr-packages folder."
        exit 1
    fi

    # Check if package.json exists in the package directory
    if [ ! -f "$package_dir/package.json" ]; then
        echo "Error: package.json not found in '$package_dir'."
        exit 1
    fi

    echo "Deploying package: $package_name"
    
    # Navigate to the package directory
    cd "$package_dir" || exit 1
    
    # Increase version number by 0.01
    npm version patch
    
    npm install --legacy-peer-deps
    # Run npm build
    npm run build
    
    # Git operations
    git add -A
    git commit -m "new version"
    git push origin main
    
    # Publish if package name doesn't include @prototypr
    if [[ "$package_name" != *"@prototypr"* ]]; then
        npm publish
    fi
    
    # Return to project root
    cd ../../
    
    # Update package.json in project root
    # new_version=$(node -p "require('./prototypr-packages/$package_name/package.json').version")
    # sed -i '' "s/\"$package_name\": \".*\"/\"$package_name\": \"^$new_version\"/" package.json
    
    echo "Deployment complete. Package version updated to $new_version. Make sure to update it in the main project package.json."
}

# Main script logic
case "$1" in
    local)
        switch_to_local
        ;;
    npm)
        switch_to_npm
        ;;
    deploy)
        if [ -z "$2" ]; then
            echo "Error: Package name is required for deployment."
            echo "Usage: $0 deploy <package-name>"
            exit 1
        fi
        deploy_package "$2"
        ;;
    watch)
        if [ -z "$2" ]; then
            echo "Error: Package name is required for watch mode."
            echo "Usage: $0 watch <package-name>"
            exit 1
        fi
        watch_package "$2"
        ;;
    *)
        echo "Usage: $0 {local|npm|deploy|watch (<package-name>)}"
        exit 1
        ;;
esac

exit 0