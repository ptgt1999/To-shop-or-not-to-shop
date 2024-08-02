const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagInfo = await Tag.findAll({
      include: ({model: Product})
    });
    res.status(200).json(tagInfo)
  } catch (error) {
    res.status(500).json(error)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagInfo = await Tag.findByPk(req.params.id, {
      include: ({model: Product})
    });
    if (!tagInfo) {
      res.status(404).json({message: "No tag found! Wrong ID"});
      return;
    }
    res.status(200).json(tagInfo)
  } catch (error) {
    res.status(500).json(error)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    console.log('Request Body: ', req.body);
    const tagInfo = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(tagInfo)
  } catch (error) {
    res.status(500).json(error)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagInfo = await Tag.update({
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );
  if (!tagInfo) {
    res.status(404).json({ message: "No Tag Found: Wrong ID"});
    return;
  }
  res.status(200).json(tagInfo);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    console.log(`Deleting tag with ID: ${req.params.id}`);
    const tagInfo = Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagInfo) {
      console.log(`No tag found with ID: ${req.params.id}`);
      res.status(404).json({ message: "No Tag Found: Wrong ID" });
      return;
    }
    console.log(`Tag with ID: ${req.params.id} deleted successfully`);
    res.status(200).json({ message: "Tag Deleted!" });
  } catch (error) {
    res.status(500).json(error);
  }
  
});

module.exports = router;
