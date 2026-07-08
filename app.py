from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/save", methods=["POST"])
def save():
    data = request.get_json()

    import json
    with open("annotation.json", "w") as f:
        json.dump(data, f, indent=4)

    return jsonify({"message": "Annotation saved successfully!"})

if __name__ == "__main__":
    app.run(debug=True)
