set -e

echo "Starting post-create setup..."

if [ -f "requirements.txt" ]; then
    echo "Installing Python requirements..."
    pip install -r requirements.txt
fi

if [ -f "package.json" ]; then
    echo "Installing Node packages..."
    npm install
fi

echo "Post-create setup complete!"