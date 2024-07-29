from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, template_folder='client/templates', static_folder='client/static')
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:ansdjdkrkTl@localhost/PreTripDB'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Spot(db.Model):
    __tablename__ = 'SPOT'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    location = db.Column(db.String(100))
    type = db.Column(db.String(100))
    description = db.Column(db.String(100))
    image_url = db.Column(db.String(255))

class Review(db.Model):
    __tablename__ = 'REVIEW'
    id = db.Column(db.Integer, primary_key=True)
    spot_id = db.Column(db.Integer, db.ForeignKey('SPOT.id'))
    rating = db.Column(db.Integer)
    review = db.Column(db.String(500))
    reviewer_id = db.Column(db.String(100))
    reviewer_name = db.Column(db.String(100))

@app.route('/')
def index():
    page = request.args.get('page', 1, type=int)
    per_page = 8  # 한 페이지에 표시할 항목 수
    spots = Spot.query.paginate(page=page, per_page=per_page, error_out=False)
    return render_template('spot.html', spots=spots)

@app.route('/detail/<int:id>')
def detail(id):
    spot = Spot.query.get_or_404(id)
    reviews = Review.query.filter_by(spot_id=id).all()
    return render_template('detail.html', spot=spot, reviews=reviews)

@app.route('/add_review', methods=['POST'])
def add_review():
    data = request.get_json()
    spot_id = data.get('spot_id')
    rating = data.get('rating')
    review_text = data.get('review')
    reviewer_id = data.get('reviewer_id')
    reviewer_name = data.get('reviewer_name')

    new_review = Review(
        spot_id=spot_id,
        rating=rating,
        review=review_text,
        reviewer_id=reviewer_id,
        reviewer_name=reviewer_name
    )
    db.session.add(new_review)
    db.session.commit()

    return jsonify({'success': True})


if __name__ == '__main__':
    app.run(debug=True)
